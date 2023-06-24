import { fireEvent, getByLabelText } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

// import { wait } from "@testing-library/user-event/dist/types/utils";


const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;

describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders the input", () => {
    expect(container.querySelector("input")).not.toBeNull();
    expect(getByLabelText(container, "(123) 456-7890")).toBeInTheDocument();
  });

  it("renders the input should be empty string", () => {
    expect(container.querySelector("input")).not.toBeNull();
    expect(getByLabelText(container, "(123) 456-7890")).toBeInTheDocument();
    expect(getByLabelText(container, "(123) 456-7890").value).toBe("");
  });

  it("input should deal with all cases of task 1", async () => {
    expect(container.querySelector("input")).not.toBeNull();
    let phoneInput = getByLabelText(container, "(123) 456-7890");
    expect(phoneInput).toBeInTheDocument(phoneInput);
    expect(phoneInput.value).toBe("");

    fireEvent.change(phoneInput, { target: { value: "1" } });
    expect(phoneInput.value).toBe("1");

    fireEvent.change(phoneInput, { target: { value: "12" } });
    expect(phoneInput.value).toBe("12");

    fireEvent.change(phoneInput, { target: { value: "123" } });
    expect(phoneInput.value).toBe("123");

    fireEvent.change(phoneInput, { target: { value: "1234" } });
    expect(phoneInput.value).toBe("(123) 4");

    fireEvent.change(phoneInput, { target: { value: "12345" } });
    expect(phoneInput.value).toBe("(123) 45");

    fireEvent.change(phoneInput, { target: { value: "1234567" } });
    expect(phoneInput.value).toBe("(123) 456-7");

    fireEvent.change(phoneInput, { target: { value: "(123) 45678" } });
    expect(phoneInput.value).toBe("(123) 456-78");

    fireEvent.change(phoneInput, { target: { value: "(123) 4567890" } });
    expect(phoneInput.value).toBe("(123) 456-7890");
  });

  it("input should deal with all cases of task 2", async () => {
    expect(container.querySelector("input")).not.toBeNull();
    let phoneInput = getByLabelText(container, "(123) 456-7890");
    expect(phoneInput).toBeInTheDocument(phoneInput);
    expect(phoneInput.value).toBe("");

    fireEvent.change(phoneInput, { target: { value: "(123) 4-7890" } });
    expect(phoneInput.value).toBe("(123) 478-90");

    fireEvent.change(phoneInput, { target: { value: "(1) 456-7890" } });
    expect(phoneInput.value).toBe("(145) 678-90");
  });
});
