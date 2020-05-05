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
        if ( Mathf.Abs(kartVelocity) > .9  )
        {
            if ( !particles[0].isPlaying )
            {
                for (int i = 0; i < particles.Length; i++)
                {
                    particles[i].Play();
                }
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
}
