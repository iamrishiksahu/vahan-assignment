import { Box } from "@mui/material";
import styled from "styled-components";

export const FlexBox = styled(Box)({
  display: "flex",
  width: '100%',
  gap: (props) => props.gap || "1rem",
  flexDirection: (props) => props.column ? "column" : "row",
  alignItems: 'center',
  justifyContent: 'center',
})

export const GridBox = styled(Box)({
  display: 'grid',
  gridTemplateColumns: (props) => props.cols? `repeat(${props.cols}, 1fr)` : 'repeat(1fr)',
  gap: (props) => props.gap || "1rem",
  alignItems: 'center',
  justifyContent: 'center',
})

export const PageParent = styled(FlexBox,{
  name: 'parent-container'
})({
  flexDirection: 'column',
  padding: (props) => props.padding || '1rem',
  margin: (props) => props.margin || '0px',
})

