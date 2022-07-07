import React from 'react';
import { getHazumiContext } from './context';

export const HazumiProvider = ({ client, children }) => {
    const HazumiContext = getHazumiContext();

    return (
        <HazumiContext.Consumer>
            {(context) => {
                if (client && context.client !== client) {
                    context = Object.assign({}, context, { client });
                }

                return (
                    <HazumiContext.Provider value={context}>
                      {children}
                    </HazumiContext.Provider>
                );
            }}
        </HazumiContext.Consumer>
    )
}

