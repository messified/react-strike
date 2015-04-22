import React from 'react';
import ReactAddons from 'react/addons';

let PureRenderMixin = ReactAddons.addons.PureRenderMixin;

let ImageUploadForm = React.createClass({
  mixins: [PureRenderMixin],
  getInitialState: function() {
    return {
      descriptionList: [],
      descriptionIndex: -1,
      description: ''
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
        setInterval(that.selectDescription, 2000);
      }
    );

    $('#upload-form-dropdown').dropdown();
  },
  selectDescription: function() {
    if (this.state.descriptionIndex < this.state.descriptionList.length - 1) {
      this.state.descriptionIndex++;
    } else {
      this.state.descriptionIndex = 0;
    }

    this.setState({
      description: this.state.descriptionList[this.state.descriptionIndex]
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
            <tr>
              <td>
                <div className="ui items">
                  <div className="item">
                    <div className="image">
                      <img src="http://placehold.it/150x150"></img>
                    </div>
                    <div className="middle aligned content">
                      filename.jpg
                    </div>
                  </div>
                </div>
              </td>
              <td>Page Name Here</td>
              <td>190kb</td>
              <td>04/10/2015</td>
            </tr>
            <tr>
              <td>
                <div className="ui items">
                  <div className="item">
                    <div className="image">
                      <img src="http://placehold.it/150x150"></img>
                    </div>
                    <div className="middle aligned content">
                      filename.jpg
                    </div>
                  </div>
                </div>
              </td>
              <td>Page Name Here</td>
              <td>190kb</td>
              <td>04/10/2015</td>
            </tr>
            <tr>
              <td>
                <div className="ui items">
                  <div className="item">
                    <div className="image">
                      <img src="http://placehold.it/150x150"></img>
                    </div>
                    <div className="middle aligned content">
                      filename.jpg
                    </div>
                  </div>
                </div>
              </td>
              <td>Page Name Here</td>
              <td>190kb</td>
              <td>04/10/2015</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

export default ImageUploadForm;
