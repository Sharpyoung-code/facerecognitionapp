import React , {useCallback, useMemo} from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticlesComponent = () => {
    const options = useMemo(() => {
        return {
            particles: {
                links: {
                    enable: true
                },
                move: {
                    enable: true
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 80,
                },
            },
        }
    }, []);

    const particlesInit = useCallback((engine) => {
        loadSlim(engine);
    }, []);
    return <Particles init={particlesInit} options={options} />
}
export default ParticlesComponent;