import React from 'react';
import Heading from '@/components/Heading';

function CustomerNav() {
    const pages = ['home', 'order', 'checkout', 'logout'];
    const hrefs = ['/customer', '/customer/order', '/customer/checkout', '/'];

    return <Heading names={pages} hrefs={hrefs} />;
}

export default CustomerNav;
