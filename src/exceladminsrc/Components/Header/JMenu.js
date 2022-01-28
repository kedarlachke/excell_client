import React, { Component } from 'react';

class JMenu extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    //this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('click', this.handleChange);
  }
  
  componentDidUpdate(prevProps) {
    // if (prevProps.children !== this.props.children) {
    //   this.$el.trigger("chosen:updated");
    // }
  }

  componentWillUnmount() {
    this.$el.off('click', this.handleChange);
   // this.$el.chosen('destroy');
  }
  
  handleChange(e) {
   // this.props.onChange(e.target.value);
   console.log('nnn nnn nnn nnn nnn');
//    $(document).ready(function(){
//     $("#menu_opener").click(function(){
//         $("#menu_content").toggleClass("sidebar",1000)
//       });
// });



  $("#menu_opener").click(function(){
      $("#menu_content").toggleClass("sidebar",1000)
    });

    console.log('ttt ttt ttt ttt ttt');
  }

  render() {
    return (
<div>
<div>
<i className="ui content icon huge" id="menu_opener"  ref={el => this.el = el}></i>
<div >
<div className="ui sidebar toggle vertical menu" id="menu_content"  >
<div className="item">About</div>
<div className="item">Contact</div>
<div className="item">CSR</div>
<div className="item">Addr</div>
<div className="item">Test</div>
</div>
  </div>
  </div>
  </div>
    );
  }
}

export default JMenu