import { FC } from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import clsx from "clsx";
import useStyles from "./styles";

const CardHeader: FC<BoxProps> = ({
  children,
  className,
  display = "flex",
  width = "100%",
  zIndex = 3,
  borderRadius = 4,
  color = "white",
  bgcolor = "primary.main",
  ...props
}) => {
  const { header } = useStyles();
  const classes = clsx(header, className);

  return (
    <Box
      display={display}
      width={width}
      zIndex={zIndex}
      borderRadius={borderRadius}
      color={color}
      bgcolor={bgcolor}
      className={classes}
      {...props}
    >
      {children}
    </Box>
  );
};

export default CardHeader;
