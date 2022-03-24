import React from "react";
import { styled, keyframes } from "@/stitches.config";
import { violet, blackA, mauve, green } from "@radix-ui/colors";
import * as DialogPrimitive from "@radix-ui/react-dialog";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  // backgroundColor: blackA.blackA9,
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "$grey600",
  borderRadius: 14,
  border: "1px solid $grey300",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  // maxWidth: '450px',
  // maxHeight: '85vh',
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  "&:focus": { outline: "none" },
});

const Content: React.FC = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
};

const StyledTitle = styled(DialogPrimitive.Title, {
  // margin: 0,
  fontWeight: 600,
  color: "$grey100",
  fontFamily: "$sansSerif",
  fontSize: "$xl",

  width: "100%",
  padding: "2rem",

  borderBottom: "1px solid $grey200",
});

const StyledDescription = styled(DialogPrimitive.Description, {
  // margin: '10px 0 20px',
  color: "$grey200",
  fontSize: 15,
  lineHeight: 1.5,
});

const StyledTrigger = styled(DialogPrimitive.Trigger, {
  backgroundColor: "transparent",
});

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = StyledTrigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;
