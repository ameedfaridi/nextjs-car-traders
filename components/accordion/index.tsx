import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      background: "rgba(0,0,0,0.1)",
    },
    heading: {
      fontSize: theme.typography.pxToRem(18),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
);

export default function SimpleAccordion({ arrayOfFaq }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {arrayOfFaq?.map(({ question, answer, _id }) => (
        <Accordion key={_id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="textSecondary" variant="button">
              {answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
