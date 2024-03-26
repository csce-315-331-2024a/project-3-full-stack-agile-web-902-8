import Link from "next/link";

export default function CustomerOrder() {
    return (
      <main>
        <nav>
          <Link href="/page/customer">
            home
          </Link>
          <Link href="/page/customer/order">
            order
          </Link>
          <Link href="/page/customer/checkout">
            checkout
          </Link>
        </nav>
      </main>
    );
}

