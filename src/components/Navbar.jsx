"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign_in");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">

        {/* LEFT - Logo + Mobile Menu
        <div className="flex items-center gap-4">

          {/* Mobile menu button */}
          {/* <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button> */}

          {/* Logo */}
          {/* <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-xl">
              ACME
            </Link>
          </div>
        </div> */} 

        Better

        {/* DESKTOP NAVIGATION */}
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link
              href="/dashboard"
              className="font-medium text-accent"
            >
              Dashboard
            </Link>
          </li>

        {
            session?.user && <li>
                <Link href="/profile" className="font-medium text-accent">
                    Profile
                </Link>
            </li>
        }
        </ul>

        {/* DESKTOP AUTH */}
        <div className="hidden items-center gap-4 md:flex">

          {isPending ? (
            <span className="text-sm opacity-60">
              Loading...
            </span>
          ) : session ? (
            <>
              <span className="text-sm">
                {session.user?.name}
              </span>

              <Button
                onPress={handleLogout}
                color="danger"
                variant="flat"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign_in">
                Login
              </Link>

              <Button
                as={Link}
                href="/sign_up"
                color="primary"
              >
                Sign Up
              </Button>
            </>
          )}

        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-separator bg-background/95 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-2 p-4">

            <li>
              <Link
                href="/"
                className="block py-2"
                onPress={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard"
                className="block py-2"
                onPress={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/profile"
                className="block py-2"
                onPress={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>

            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">

              {isPending ? (
                <span className="py-2 text-sm opacity-60">
                  Loading...
                </span>
              ) : session ? (
                <>
                  <span className="py-2 text-sm">
                    {session.user?.name}
                  </span>

                  <Button
                    onPress={handleLogout}
                    color="danger"
                    variant="flat"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign_in"
                    className="block py-2"
                  >
                    Login
                  </Link>

                  <Button
                    as={Link}
                    href="/sign_up"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </>
              )}

            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}