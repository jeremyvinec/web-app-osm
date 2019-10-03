import React from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
const initialState = {
    viewport: {
        latitude: 44.559860,
        longitude: 6.075870,
        zoom: 10
    },
};

type State = typeof initialState;
type Viewport = typeof initialState.viewport;

export default class Map extends React.Component<{}, State> {
    public state: State = initialState;

    public componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    public updateViewport = (viewport: Viewport) => {
        console.log(viewport)
        this.setState(prevState => ({
            viewport: { ...prevState.viewport, ...viewport },
        }));
    };

    public resize = () => {
        this.setState(prevState => ({
            viewport: {
                ...prevState.viewport,
                height: window.innerHeight,
                width: window.innerWidth,
            },
        }));
    };

    public render() {
        const { viewport } = this.state;
        return (
            <ReactMapGL
                {...viewport}
                width="100vw"
                height="100vh"
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/outdoors-v11"
                onViewportChange={(v: Viewport) => this.updateViewport(v)}
            >
                <div style={{ position: 'absolute', right: 30, bottom: 30 }}>
                    <NavigationControl onViewportChange={this.updateViewport} />
                </div>
            </ReactMapGL>
        );
    }
}