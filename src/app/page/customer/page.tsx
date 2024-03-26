import Link from "next/link";

export default function Customer() {
    return (
      <main>
          <div>
            <p>
              Customer&nbsp;
            </p>
          </div>

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
        
        {/* TODO: Add styling for the categories */}
        <nav>
          
        </nav>
      </main>
    );
}
