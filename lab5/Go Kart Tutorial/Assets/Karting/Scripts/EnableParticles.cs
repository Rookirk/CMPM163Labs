using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnableParticles : MonoBehaviour
{
    public ParticleSystem[] particles;

    private float kartVelocity;

    // Start is called before the first frame update
    void Start()
    {
        kartVelocity = 0.0f;
    }

    // Update is called once per frame
    void Update()
    {
        if ( Mathf.Abs(kartVelocity) > 5  )
        {
            if ( !particles[0].isPlaying )
            {
                for (int i = 0; i < particles.Length; i++)
                {
                    particles[i].Play();
                }
            }
            for (int i = 0; i < particles.Length; i++)
            {
                var main = particles[i].main;
                main.startSpeed = MapValue(kartVelocity, 0, 25, 0, 10);
            }
        }
        else
        {
            if ( particles[0].isPlaying )
            {
                for (int i = 0; i < particles.Length; i++)
                {
                    particles[i].Stop();
                }
            }
        }
    }

    public void SetVelocity(float velocity)
    {
        kartVelocity = velocity;
    }
    // http://james-ramsden.com/map-a-value-from-one-number-scale-to-another-formula-and-c-code/
    private float MapValue(float a, float a0, float a1, float b0, float b1)
    {
        return b0 + (b1 - b0) * ((a - a0) / (a1 - a0));
    }
}
