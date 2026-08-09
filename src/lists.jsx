import React from "react";


const List = ({ names }) => {
    return (
      <>
        <Routes>
          {names.map((name) => {
            if (name.includes(text)) {
              return (
                <Route
                  path={`/${name}`}
                  element={<Pokemon name={name} />}
                  key={name}
                />
              );
            }
          })}
        </Routes>
        {names.map((name) => {
          if (name.includes(text)) {
            return (
              <Link to={`/${name}`} className="element" key={name}>
                {name}
              </Link>
            );
          }
        })}
      </>
    );
  };

export default routesList, linksList