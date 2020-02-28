import React from 'react'

const Context = React.createContext({
  version: 'v2.x',
  setVersion: (v :string) => {
    console.log(v)
  },
});

export default Context;


// export function CommonProvider (props: any) {
//   const [version, setVersion] = useState('v2.x')
//   return (
//       <Provider value={{
//         version,
//         setVersion
//       }}>
//         {props.children}
//       </Provider> 
//   )
// }

// export default {
//   Provider, Consumer
// }

