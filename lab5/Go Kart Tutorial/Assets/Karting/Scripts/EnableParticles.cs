using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnableParticles : MonoBehaviour
{
    public ParticleSystem particles;

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
            if ( !particles.isPlaying )
            {
                particles.Play();
            }
        }
        else
        {
            if ( particles.isPlaying )
            {
                particles.Stop();
            }
        }
    }

    public void SetVelocity(float velocity)
    {
        kartVelocity = velocity;
    }
}
