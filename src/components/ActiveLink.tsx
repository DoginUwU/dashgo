import { cloneElement, ReactElement } from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive =
    shouldMatchExactHref && (asPath === rest.href || asPath === rest.as);

  isActive =
    !shouldMatchExactHref &&
    (asPath.startsWith(String(rest.href)) ||
      asPath.startsWith(String(rest.as)));

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "blue.400" : "gray.50",
      })}
    </Link>
  );
}
