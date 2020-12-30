import { FC } from "react";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import clsx from "clsx";
import useStyles from "./styles";

const Card: FC<PaperProps> = ({ children, className, ...props }) => {
  const { card } = useStyles();
  const classes = clsx(card, className);

  return (
    <Paper className={classes} {...props}>
      {children}
    </Paper>
  );
};

export default Card;
