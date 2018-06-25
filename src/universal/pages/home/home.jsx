import React from 'react';


import MainLayout from 'layouts/main-layout/main.layout';

import ItemListProvider from 'containers/item-list-provider/item-list-provider';
import ItemGrid from 'components/item-grid/item-grid';

const HomePage = () => {
  const categoriesToDisplay = ['recent', 'popular'];
  return (
    <React.Fragment>
      <MainLayout>
        {categoriesToDisplay.forEach(categoryName => (
          <ItemListProvider
            title={categoryName}
            by={categoryName}
            limit={8}
            render={data => (
              <div styleName="container">
                <ItemGrid itemData={data} />
              </div>
            )}
          />
        ))}
      </MainLayout>
    </React.Fragment>
  );
};

export default HomePage;
