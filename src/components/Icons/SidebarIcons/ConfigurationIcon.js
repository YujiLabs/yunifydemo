import React from 'react';

class ConfigurationIcon extends React.Component {
    render() {
        return (
            <svg 
                className={this.props.className} 
                width="20" 
                height="20" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                    d="M9.167 2.5H10.833C11.227 2.5 11.583 2.827 11.583 3.333V4.833H14.167C14.562 4.833 14.833 5.227 14.833 5.833V7.167H16.667C17.401 7.167 18 7.766 18 8.5V10.833C18 11.567 17.401 12.167 16.667 12.167H14.833V13.833H14.167C13.733 13.833 13.333 13.427 13.333 13.033V12.167H10.833V14.833H9.167V12.167H5.833V13.167C5.833 13.873 5.167 14.5 4.333 14.5H2.5C1.766 14.5 1.167 13.901 1.167 13.167V8.833C1.167 8.099 1.766 7.5 2.5 7.5H4.5V5.833H5.167C5.723 5.833 6.167 5.333 6.167 4.833V3.167H8.167C8.569 3.167 8.833 2.9 8.833 2.5H9.167Z"
                />
            </svg>
        );
    }
}

export default ConfigurationIcon;
