export const requireFunction = (value) => {
  return value && value.trim().length > 0;
};
export const nameFunction = (value) => {
  // console.log("name", value.length > 3 && value.length < 25);
  return value.length > 3 && value.length < 25;
};
export const passwordFunction = (value) => {
  console.log("password", value.length > 8 && value.length < 15);
  return value.length > 8 && value.length < 15;
};
export const addressFunction = (value) => {
  console.log("address", value.length > 3);
  return value.length > 3;
};
