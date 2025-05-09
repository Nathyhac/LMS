
import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLink = React.forwardRef(({ to, className, children, ...rest }, ref) => (
  <NavLink to={to} ref={ref} className={className} {...rest}>
    {children}
  </NavLink>
));

export default SidebarLink;
