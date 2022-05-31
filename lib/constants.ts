export const appChainId = 43114;
export const recipientAddress = "0x95Ebb6e04B11bd7f5c0C0aADb27fE0A3E0eE3452";
export const claim = `Welcome to Sch0lar!\n\nThis signature will not cost you any fees.`;
export const magicSessionStorage = "magic";
export const web3SessionStorage = "web3Modal";
export const COLORS = {
  charcoal: "#171616",
  red: "#E84142",
  orange: "rgb(249,143,71)",
  grey: "#e0d7cc",
  blue: "#1976d2",
  bgPurp: "#292c4f",
  darkPurp: "#31345e",
  lighterDarkPurp: "#3f4478",
  mediumPurp: "#8E7DBE",
  lightPurp: "#d0c9e4",
  lightGreen: "#41ead4",
  lightestGreen: "#B6F7EE",
  white: "#ffffff",
  chartColors: ["#41EAD4", "#8E7DBE", "#F56476", "#F7C59F"],
};
export const totalSclr = Number(50000000).toLocaleString();
export const totalWorkingSclr = 50000000000000;

export const contractAddressFunc = (chainId: number | undefined) => {
  return chainId === 1
    ? "0x1E146941160F755e3792C1182ab7782450D6E80F"
    : chainId === 5
    ? "0x81F50Bd6D18e4A32c5cF187A6E0E6FbD076D7a6E"
    : chainId === 4
    ? "0x1EB23af863310AaddaF928c8baDae5b468178866"
    : "0x60832ADf3Bd45065B89CDcC99Ad8A5F95B426F70";
};

export const drawerWidth = 240;
export const maxBuySize = 5000;
