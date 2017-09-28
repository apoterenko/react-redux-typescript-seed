import * as React from 'react';

export class Footer extends React.PureComponent<{}, {}> {

  public render(): JSX.Element {
    const props = this.props;
    return (
        <section className='mdc-card__actions app-footer'>
          {props.children}
        </section>
    );
  }
}
