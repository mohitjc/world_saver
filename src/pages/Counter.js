import React from 'react';

import Layout from '../components/global/Layout';

const Counter = () => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title">Counter - Local Update</h1>
          {/* <Query query={counterQuery}>
            {({ data, client }) => (
              <div>
                <p>
                  {data && data.counter && `🐑 Counter: ${data.counter.value}`}
                </p>
                <button onClick={() => handleIncrement(data, client)}>
                  Increment
                </button>
              </div>
            )}
          </Query> */}
        </div>
      </section>
    </Layout>
  );
};

export default Counter;
