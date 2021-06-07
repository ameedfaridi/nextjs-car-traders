import axios from "axios";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import {
  Button,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Theme,
} from "@material-ui/core";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import getAsString from "../../src/getAsString";

export interface CarMake {
  count: number;
  _id: string;
}

export interface HomeProps {
  MakeCountArray: CarMake[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: "auto",
      maxWidth: 500,
      padding: theme.spacing(3),
    },
  })
);

const Prices = [500000, 1000000, 5000000, 7500000, 10000000, 50000000];

const ModelSelect = ({ modelsData, make, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data } = useSWR(`/car/models/${make}`, {
    dedupingInterval: 6000,
    onSuccess: (newValues) => {
      if (!newValues.find(({ model }) => model === field.value)) {
        setFieldValue("model", "all");
      }
    },
  });

  const newModels = data || modelsData;

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="search-make">Models</InputLabel>
      <Select
        labelId="search-model"
        label="Model"
        name="model"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels.map((item) => (
          <MenuItem
            key={item._id}
            value={item.model}
          >{`${item.model}`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default function Search({
  makesData,
  modelsData,
  singleColumn,
}) {
  const classes = useStyles();
  const { query } = useRouter();

  const smValue = singleColumn ? 12 : 6;

  const initialValues = {
    make: getAsString(query.make) || "all",
    model: getAsString(query.model) || "all",
    minPrice: getAsString(query.minPrice) || "all",
    maxPrice: getAsString(query.maxPrice) || "all",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/cars",
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={smValue}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="search-make">Make</InputLabel>
                  <Field
                    as={Select}
                    labelId="search-make"
                    label="Make"
                    name="make"
                  >
                    <MenuItem value="all">
                      <em>All Makes</em>
                    </MenuItem>
                    {makesData.map((item, index) => (
                      <MenuItem
                        key={index}
                        value={item._id}
                      >{`${item._id} (${item.count})`}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <ModelSelect
                  name="model"
                  make={values.make}
                  modelsData={modelsData}
                />
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="search-min-price">Min Price</InputLabel>
                  <Field
                    as={Select}
                    labelId="search-min-price"
                    label="Min Price"
                    name="minPrice"
                  >
                    <MenuItem value="all">
                      <em>No minimun prices</em>
                    </MenuItem>
                    {Prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="search-max-price">Max Price</InputLabel>
                  <Field
                    as={Select}
                    labelId="search-max-price"
                    label="max Price"
                    name="maxPrice"
                  >
                    <MenuItem value="all">
                      <em>No maximun prices</em>
                    </MenuItem>
                    {Prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}
