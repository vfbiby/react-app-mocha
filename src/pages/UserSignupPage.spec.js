import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserSignupPage } from "./UserSignupPage";
import * as jest from "jest-mock";

describe("UserSignupPage", () => {
  describe("layout", () => {
    it("has header of Sign Up", () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector("h1");
      expect(header).toHaveTextContent("Sign Up");
    });

    it("has input for display name", () => {
      render(<UserSignupPage />);
      const displayNameInput = screen.getByPlaceholderText("Your display name");
      expect(displayNameInput).toBeInTheDocument();
    });

    it("has input for username", () => {
      render(<UserSignupPage />);
      const usernameInput = screen.getByPlaceholderText("Your username");
      expect(usernameInput).toBeInTheDocument();
    });

    it("has input for password", () => {
      render(<UserSignupPage />);
      const passwordInput = screen.getByPlaceholderText("Your password");
      expect(passwordInput).toBeInTheDocument();
    });

    it("has password type for password input", () => {
      render(<UserSignupPage />);
      const passwordInput = screen.getByPlaceholderText("Your password");
      expect(passwordInput.type).toBe("password");
    });

    it("has input for password repeat", () => {
      render(<UserSignupPage />);
      const passwordRepeatInput = screen.getByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it("has password type for password repeat input", () => {
      render(<UserSignupPage />);
      const passwordRepeatInput = screen.getByPlaceholderText(
        "Repeat your password"
      );
      expect(passwordRepeatInput.type).toBe("password");
    });

    it("has submit button", () => {
      render(<UserSignupPage />);
      const button = screen.getByRole("button", { name: "Sign Up" });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
    };

    const setupForSubmit = (actions) => {
      render(<UserSignupPage actions={actions} />);
      const displayNameInput = screen.getByPlaceholderText("Your display name");
      userEvent.type(displayNameInput, "my-display-name");
      const usernameInput = screen.getByPlaceholderText("Your username");
      userEvent.type(usernameInput, "my-username");
      const passwordInput = screen.getByPlaceholderText("Your password");
      userEvent.type(passwordInput, "p4ssword");
      const passwordRepeatInput = screen.getByPlaceholderText(
        "Repeat your password"
      );
      userEvent.type(passwordRepeatInput, "p4ssword");
      const button = screen.getByRole("button", { name: "Sign Up" });
      return button;
    };

    it("call postSignup when the fields are valid and actions are provided in props", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValue({}),
      };
      const button = setupForSubmit(actions);
      userEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("call post with user body when the fields are", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValue({}),
      };
      const button = setupForSubmit(actions);
      userEvent.click(button);
      const expectedUserObject = {
        username: "my-username",
        displayName: "my-display-name",
        password: "p4ssword",
      };
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });

    it("does not allow user to click the sign up button when there is a ongoing api call", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValue({}),
      };
      const signupButton = setupForSubmit(actions);
      userEvent.click(signupButton);
      userEvent.click(signupButton);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });

    it("does not throw exception when click the button when actions are not provided in props", () => {
      const signupButton = setupForSubmit();
      expect(() => userEvent.click(signupButton)).not.toThrow();
    });

    it("display spinner when there is an ongoing api call", () => {
      const actions = {
        postSignup: jest.fn().mockResolvedValue({}),
      };
      const signupButton = setupForSubmit(actions);
      userEvent.click(signupButton);
      expect(screen.queryByText("loading...")).toBeInTheDocument();
    });

    it("hide spinner after api call finishes successfully", async () => {
      const actions = {
        postSignup: mockAsyncDelayed(),
      };
      const signupButton = setupForSubmit(actions);
      userEvent.click(signupButton);
      await waitFor(() => {
        const spinner = screen.queryByText("loading...");
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it("hide spinner after api call finished with error", async () => {
      const actions = {
        postSignup: jest.fn().mockImplementation(() => {
          return new Promise((_resolve, reject) => {
            setTimeout(() => {
              reject({});
            }, 300);
          });
        }),
      };
      const signupButton = setupForSubmit(actions);
      userEvent.click(signupButton);
      await waitFor(() => {
        const spinner = screen.queryByText("loading...");
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it("set the displayName value to state", () => {
      render(<UserSignupPage />);
      const displayNameInput = screen.getByPlaceholderText("Your display name");
      userEvent.type(displayNameInput, "my-display-name");
      expect(displayNameInput.value).toBe("my-display-name");
    });

    it("set the username value to state", () => {
      render(<UserSignupPage />);
      const usernameInput = screen.getByPlaceholderText("Your username");
      userEvent.type(usernameInput, "my-username");
      expect(usernameInput.value).toBe("my-username");
    });

    it("set the password value to state", () => {
      render(<UserSignupPage />);
      const passwordInput = screen.getByPlaceholderText("Your password");
      userEvent.type(passwordInput, "my-password");
      expect(passwordInput.value).toBe("my-password");
    });

    it("set the password repeat value to state", () => {
      render(<UserSignupPage />);
      const passwordRepeatInput = screen.getByPlaceholderText(
        "Repeat your password"
      );
      userEvent.type(passwordRepeatInput, "p4ssword");
      expect(passwordRepeatInput.value).toBe("p4ssword");
    });
  });
});
