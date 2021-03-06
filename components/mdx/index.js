import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
import { Type } from '@components/typography';
import { slugify } from '@common';

const H1 = ({ children, ...rest }) => {
  const id = slugify(children.toString());
  return (
    <Type.h1 id={id} {...rest}>
      {children}
    </Type.h1>
  );
};
const H2 = ({ children, ...rest }) => {
  const id = slugify(children.toString());
  return (
    <Type.h2 id={id} {...rest}>
      {children}
    </Type.h2>
  );
};
const H3 = ({ children, ...rest }) => {
  const id = slugify(children.toString());
  return (
    <Type.h3 id={id} {...rest}>
      {children}
    </Type.h3>
  );
};

const baseProps = {
  lineHeight: '1.65',
};

const Mdx = ({ children }) => (
  <MDXProvider
    components={{
      h1: props => <H1 color="currentColor" mt={5} mb={4} {...props} />,
      h2: props => <H2 color="currentColor" {...props} />,
      h3: props => <H3 pt={3} color="currentColor" {...props} />,
      h4: props => <Type.h4 color="currentColor" {...props} />,
      h5: props => <Type.h5 color="currentColor" {...props} />,
      h6: props => <Type.h6 color="currentColor" {...props} />,
      p: props => <Type.p color="currentColor" {...baseProps} {...props} />,
      strong: props => (
        <Type.strong
          display="inline"
          fontWeight="700"
          color="currentColor"
          {...baseProps}
          {...props}
        />
      ),
      pre: props => <Type.pre color="currentColor" {...baseProps} {...props} />,
      ol: props => (
        <Type.ol
          color="currentColor"
          mt={3}
          display="inline-block"
          {...baseProps}
          {...props}
        />
      ),
      ul: props => (
        <Type.ul
          color="currentColor"
          mt={3}
          display="inline-block"
          {...baseProps}
          {...props}
        />
      ),
      li: props => (
        <Type.li color="currentColor" my="10px" {...baseProps} {...props} />
      ),
    }}
  >
    {children}
  </MDXProvider>
);

export { Mdx };
