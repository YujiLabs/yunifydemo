import React from 'react';

class AppStoreIcon extends React.Component {
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
                    d="M5.5 3.167C5.823 2.8 6.333 2.667 6.667 2.667H13.333C13.667 2.667 14.177 2.8 14.5 3.167L17.167 6.5C17.6 7.033 17.667 7.833 17.167 8.333L13.833 12.167C13.333 12.667 12.6 12.8 12.1 12.333L9.833 10.167L6.667 12.333C6.167 12.8 5.433 12.667 5.167 12.167L1.833 8.333C1.333 7.833 1.4 7.033 1.833 6.5L5.5 3.167Z"
                />
            </svg>
        );
    }
}

export default AppStoreIcon;
