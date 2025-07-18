import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccountMenu from "./AccountMenu";

// Mock the content data
jest.mock("@/data/content.json", () => ({
  ui: {
    accountMenu: {
      loginPrompt: "Login to your account",
      menuItems: {
        account: "Account",
        security: "Security",
        messages: "Messages",
      },
    },
    buttons: {
      signIn: "Sign in",
      signOut: "Sign out",
    },
  },
}));

describe("AccountMenu", () => {
  const mockHandlers = {
    onSignIn: jest.fn(),
    onSignOut: jest.fn(),
    onAccountClick: jest.fn(),
    onSecurityClick: jest.fn(),
    onMessagesClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Logged out state", () => {
    it("renders login prompt when user is logged out", async () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Login to your account")).toBeInTheDocument();
      });
    });

    it("renders sign in button when user is logged out", async () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /sign in/i }),
        ).toBeInTheDocument();
      });
    });

    it("calls onSignIn when sign in button is clicked", async () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const signInButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(signInButton);
      });

      expect(mockHandlers.onSignIn).toHaveBeenCalledTimes(1);
    });

    it("does not render menu items when logged out", async () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.queryByText("Account")).not.toBeInTheDocument();
        expect(screen.queryByText("Security")).not.toBeInTheDocument();
        expect(screen.queryByText("Messages")).not.toBeInTheDocument();
      });
    });
  });

  describe("Logged in state", () => {
    it("renders username when user is logged in", async () => {
      render(
        <AccountMenu isLoggedIn={true} username="John Doe" {...mockHandlers} />,
      );

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      });
    });

    it("renders fallback username when no username provided", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("<Username>")).toBeInTheDocument();
      });
    });

    it("renders all menu items when logged in", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByRole("menuitem", { name: /account/i }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("menuitem", { name: /security/i }),
        ).toBeInTheDocument();
        expect(
          screen.getByRole("menuitem", { name: /messages/i }),
        ).toBeInTheDocument();
      });
    });

    it("renders sign out button when logged in", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByRole("button", { name: /sign out/i }),
        ).toBeInTheDocument();
      });
    });

    it("calls onAccountClick when account menu item is clicked", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const accountItem = screen.getByRole("menuitem", { name: /account/i });
        fireEvent.click(accountItem);
      });

      expect(mockHandlers.onAccountClick).toHaveBeenCalledTimes(1);
    });

    it("calls onSecurityClick when security menu item is clicked", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const securityItem = screen.getByRole("menuitem", {
          name: /security/i,
        });
        fireEvent.click(securityItem);
      });

      expect(mockHandlers.onSecurityClick).toHaveBeenCalledTimes(1);
    });

    it("calls onMessagesClick when messages menu item is clicked", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const messagesItem = screen.getByRole("menuitem", {
          name: /messages/i,
        });
        fireEvent.click(messagesItem);
      });

      expect(mockHandlers.onMessagesClick).toHaveBeenCalledTimes(1);
    });

    it("calls onSignOut when sign out button is clicked", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const signOutButton = screen.getByRole("button", { name: /sign out/i });
        fireEvent.click(signOutButton);
      });

      expect(mockHandlers.onSignOut).toHaveBeenCalledTimes(1);
    });

    it("does not render login prompt when logged in", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.queryByText("Login to your account"),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA label for trigger button", () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      expect(trigger).toHaveAttribute("aria-label", "User account menu");
    });

    it("supports keyboard navigation", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });

      // Test keyboard activation
      fireEvent.keyDown(trigger, { key: "Enter" });

      await waitFor(() => {
        expect(screen.getByText("Account")).toBeInTheDocument();
      });
    });
  });

  describe("Menu behavior", () => {
    it("closes menu after clicking a menu item", async () => {
      render(<AccountMenu isLoggedIn={true} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const accountItem = screen.getByRole("menuitem", { name: /account/i });
        fireEvent.click(accountItem);
      });

      // Menu should close after clicking
      await waitFor(() => {
        expect(
          screen.queryByRole("menuitem", { name: /account/i }),
        ).not.toBeInTheDocument();
      });
    });

    it("closes menu after clicking sign in button", async () => {
      render(<AccountMenu isLoggedIn={false} {...mockHandlers} />);

      const trigger = screen.getByRole("button", {
        name: /user account menu/i,
      });
      fireEvent.click(trigger);

      await waitFor(() => {
        const signInButton = screen.getByRole("button", { name: /sign in/i });
        fireEvent.click(signInButton);
      });

      // Menu should close after clicking
      await waitFor(() => {
        expect(
          screen.queryByText("Login to your account"),
        ).not.toBeInTheDocument();
      });
    });
  });
});
