'use strict';
var React = require('react');
var Item = require('./item');

var List = React.createClass({
  render: function(){
    var list = this.props.lists;
    var items = list.items;
    /* jshint ignore:start */
    if (typeof list === 'undefined') {
      return (<ul>
                <li>No list created</li>
             </ul>)
    }
    else if (typeof items === 'undefined') {
      return (<ul>
                <li>No Items created</li>
             </ul>)
    }else{
      return (<div>
        {
          list.items.map(function(item) {
            return (<Item key={item.id} item={item} />)
          })
        }
      </div>);
    }
    /* jshint ignore:end */
  }
});

module.exports = List;
