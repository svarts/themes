import * as React from 'react';
import classNames from 'classnames';
import { Slot } from '@radix-ui/react-slot';
import { skeletonPropDefs } from './skeleton.props';
import { extractProps, marginPropDefs } from '../helpers';

import type { MarginProps, GetPropDefTypes, PropsWithoutRefOrColor } from '../helpers';

type SkeletonElement = React.ElementRef<'span'>;
type SkeletonOwnProps = GetPropDefTypes<typeof skeletonPropDefs>;
interface SkeletonProps extends PropsWithoutRefOrColor<'span'>, MarginProps, SkeletonOwnProps {}
const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { children, className, loading, ...skeletonProps } = extractProps(
    props,
    skeletonPropDefs,
    marginPropDefs
  );

  if (!loading) return <>{children}</>;

  const Tag = React.isValidElement(children) ? Slot : 'span';

  return (
    <Tag
      ref={forwardedRef}
      aria-hidden
      className={classNames('rt-Skeleton', className)}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      tabIndex={-1}
      // Workaround to use `inert` until https://github.com/facebook/react/pull/24730 is merged.
      {...{ inert: true ? '' : undefined }}
      {...skeletonProps}
    >
      {children}
    </Tag>
  );
});
Skeleton.displayName = 'Skeleton';

export { Skeleton };
export type { SkeletonProps };
