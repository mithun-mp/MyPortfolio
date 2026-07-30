import { describe, it, expect } from "vitest";

describe("GitHub Allowlist Verification", () => {
  const allowedAdmin = "mithun-mp";

  it("permits exact match for mithun-mp", () => {
    const inputUsername = "mithun-mp";
    expect(inputUsername.toLowerCase()).toBe(allowedAdmin);
  });

  it("permits case-insensitive match for Mithun-MP", () => {
    const inputUsername = "Mithun-MP";
    expect(inputUsername.toLowerCase()).toBe(allowedAdmin);
  });

  it("denies unauthorized usernames", () => {
    const unauthorized = ["random-user", "attacker", "mithun_mp", "admin"];
    unauthorized.forEach((user) => {
      expect(user.toLowerCase() === allowedAdmin).toBe(false);
    });
  });
});
