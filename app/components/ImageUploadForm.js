import React from 'react';
import ReactAddons from 'react/addons';

let PureRenderMixin = ReactAddons.addons.PureRenderMixin;

let ImageUploadForm = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      descriptionList: [],
      descriptionIndex: 0,
      description: '',
      listTemplate: []
    };
  },
  componentDidMount: function() {
    let that = this;

    $.get('http://localhost:3000/api/listImages').done(
      response => {
        that.setState({
          descriptionList: response
        });
        that.selectDescription();
      }
    );

    $('#upload-form-dropdown').dropdown();
  },
  selectDescription: function() {

    var bucketItems = this.state.descriptionList;
    var contents = [];
    for (var i = 1; i < bucketItems.length; i++) {
      contents.push(this.state.descriptionList[i]);
    }

    this.setState({
      description: this.state.descriptionList[this.state.descriptionIndex],
      listTemplate: contents.map(function(data){
        var image = 'https://s3.amazonaws.com/sotp-media/'+data.Key;
        var d = new Date(data.LastModified);
        var day = d.getDay();
        var month = d.getMonth();
        var year = d.getFullYear();
        return [
          <tr>
            <td>
              <div className="ui items">
                <div className="item">
                  <div className="image">
                    <img src={image} />
                  </div>
                  <div className="middle aligned content">
                    {data.Key.replace('stuff/', '')}
                  </div>
                </div>
              </div>
            </td>
            <td>Lambo Page</td>
            <td>{data.Size}kb</td>
            <td>{day}/{month}/{year}</td>
          </tr>
        ];
      })
    });
  },
  dropdownChanged: function(event) {
    console.log(event);
  },
  render() {
    return(
      <div className="sixteen wide column">
        <h2>Add an image</h2>
        <h3>
          Step 1. <span className="lightweight-font">Select the destination page for the image</span>
        </h3>
        <select className="ui dropdown" id="upload-form-dropdown">
          <option value="" onchange="this.dropdownChanged()">Select Page</option>
          <option value="1">Hautelook Log In Background</option>
          <option value="2">Hautelook Log Out Background</option>
          <option value="3">Hautelook Invites Page Banner</option>
        </select>
        <h3>
          Step 2. <span className="lightweight-font">Upload Image</span>
        </h3>
        <label className="image-input-button">
          <input type="file" required/>
          <div className="ui middle aligned statistic">
            <div className="value">
              <img className="image" src="/images/icon_upload.png"></img>
            </div>
            <div className="label">
              Upload Image
            </div>
          </div>
        </label>
        <h2>Uploaded Images</h2>
        <table className="ui very basic table uploaded-images-table">
          <thead>
            <tr>
              <th className="six wide">Image</th>
              <th className="six wide">Page</th>
              <th className="two wide">File Size</th>
              <th className="two wide">Date Added</th>
            </tr>
          </thead>
          <tbody>
            {this.state.listTemplate}
          </tbody>
        </table>
      </div>
    );
  }
});

export default ImageUploadForm;
