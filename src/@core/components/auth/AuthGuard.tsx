import { ReactNode, ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { authState } from "src/helpers";
import { APP_ROUTES } from "src/configs/routes";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const { data: session, status } = useSession();
  const router = useRouter();

  // Trigger when router.route, status dependences are changed
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      if (status === authState.unauthenticated && !session) {
        router.replace({
          pathname: APP_ROUTES.LOGIN,
        });
      } else if (status === authState.authenticated && session?.user) {
        if (
          router?.pathname === APP_ROUTES.LOGIN ||
          router?.pathname === APP_ROUTES.REGISTER
        ) {
          router.replace({
            pathname: "/",
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, status]
  );

  if (status === authState.loading && !session) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
