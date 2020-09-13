import React from 'react';

const Link = ({ className, href, children }) => {
  const handleClick = (event) => {
    if(event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);
    const evt = new PopStateEvent('popstate');
    window.dispatchEvent(evt);
  };

  return <a className={className} href={href} onClick={handleClick}>{children}</a>;
};

export default Link;