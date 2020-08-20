import React, { Component } from 'react';
import SortableTree from '../src';
// In your own app, you would need to use import styles once in the app
// import 'react-sortable-tree/styles.css';
const treeDefault = [
  {
    title: 'Mong',
    children: [
      {
        title: 'Cô Cô',
        children: [],
      },
      {
        title: 'Naruto',
        children: [],
      },
      {
        title: 'Ki ki',
        children: [],
      },
      {
        title: 'Yasua',
        children: [],
      },
      {
        title: 'MasterYi',
        children: [],
      },
    ],
  },
  {
    title: 'Nam',
    children: [],
  },
  {
    title: 'Hưng',
    children: [],
  },
  {
    title: 'Khanh',
    children: [],
  },
  {
    title: 'Linh',
    children: [],
  },
  {
    title: 'MongDezai',
    children: [],
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    // const title = 'Hay';

    // For generating a haystack (you probably won't need to do this)
    // const getStack = (left, hasNeedle = false) => {
    //   if (left === 0) {
    //     return hasNeedle ? { title: 'Needle' } : { title };
    //   }

    //   return {
    //     title,
    //     children: [
    //       {
    //         title,
    //         children: [getStack(left - 1, hasNeedle && left % 2), { title }],
    //       },
    //       { title },
    //       {
    //         title,
    //         children: [
    //           { title },
    //           getStack(left - 1, hasNeedle && (left + 1) % 2),
    //         ],
    //       },
    //     ],
    //   };
    // };

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      // treeData: [
      //   {
      //     title: 'Haystack',
      //     children: [
      //       getStack(3, true),
      //       getStack(3),
      //       { title },
      //       getStack(2, true),
      //     ],
      //   },
      // ],
      treeData: treeDefault,
    };
  }

  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;
    debugger;

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) => {
      // debugger;
      const searchText =
        searchQuery &&
        node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;
      return searchText;
    };

    const searchFinishCallback = matches => {
      debugger;
      const data = [
        {
          node: {
            title: 'Yasua',
            children: [],
          },
          path: [0, 4],
        },
        {
          node: {
            title: 'MasterYi',
            children: [],
          },
          path: [0, 5],
        }
      ];
      this.setState({
        searchFoundCount: matches.length,
      });
    };
    return (
      <div>
        <h2>Find the needle!</h2>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={event =>
              this.setState({ searchString: event.target.value })
            }
          />
        </form>

        <div style={{ height: 300 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/frontend-collective/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            // searchFocusOffset={0}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={searchFinishCallback}
          />
        </div>
      </div>
    );
  }
}
