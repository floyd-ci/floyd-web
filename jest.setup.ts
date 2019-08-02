import "jest-localstorage-mock";
import {GlobalWithFetchMock} from "jest-fetch-mock";

const customGlobal = global as GlobalWithFetchMock;
customGlobal.fetch = customGlobal.fetchMock = require("jest-fetch-mock");
