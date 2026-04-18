import styled from "styled-components";

const Wrapper = styled.header`
  width: 91%;
  padding: 10px 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.card};
  border-bottom: 1px solid #e5e7eb;

  position: sticky;
  top: 0;
  z-index: 100;

  /* Tablet & Desktop */
  @media (min-width: 768px) {
    width: 95%;
    padding: 14px 32px;
  }
`;

const Logo = styled.img`
  height: 26px;

  @media (min-width: 768px) {
    height: 34px;
  }
`;

const Toggle = styled.button`
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};

  border: 1px solid #e5e7eb;
  padding: 6px 10px;
  border-radius: 20px;

  cursor: pointer;
  font-size: 11px;
  white-space: nowrap;

  display: flex;
  align-items: center;
  gap: 4px;

  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }

  /* Bigger on desktop */
  @media (min-width: 768px) {
    padding: 8px 14px;
    font-size: 13px;
  }
`;

export default function Header({ dark, setDark }: any) {
  return (
    <Wrapper>
      <Logo
            src="https://mintcdn.com/koinx-e9affad9/LOmNn9AqqIkzpIW8/logo/dark.svg?fit=max&auto=format&n=LOmNn9AqqIkzpIW8&q=85&s=4b0f67d25b1aafbd2f215279047fd3c2"
            alt="KoinX"
      />

      <Toggle onClick={() => setDark(!dark)}>
        {dark ? "🌙" : "☀️"}
        <span>{dark ? "Dark" : "Light"}</span>
      </Toggle>
    </Wrapper>
  );
}