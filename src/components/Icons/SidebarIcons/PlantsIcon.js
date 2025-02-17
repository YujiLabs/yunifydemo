import React from 'react';

class PlantsIcon extends React.Component {
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
                    d="M10 1.667C12.5 3.667 13.667 6.5 13.667 8.833C13.667 13.167 10 16.167 10 16.167C10 16.167 6.333 13.167 6.333 8.833C6.333 6.5 7.5 3.667 10 1.667Z"
                />
            </svg>
        );
    }
}

export default PlantsIcon;
