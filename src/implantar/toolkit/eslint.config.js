// Root ESLint flat config composing consolidated configs (ES module)
import base from "./configs/eslint/base.js";
import browser from "./configs/eslint/browser.js";
import node from "./configs/eslint/node.js";
import react from "./configs/eslint/react.js";
import typescript from "./configs/eslint/typescript.js";

export default [...base, ...typescript, ...react, ...node, ...browser];
