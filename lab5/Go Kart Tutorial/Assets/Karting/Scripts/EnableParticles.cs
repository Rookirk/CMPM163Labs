using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnableParticles : MonoBehaviour
{
    public ParticleSystem[] backParticles;
    public ParticleSystem[] leftParticles;
    public ParticleSystem[] rightParticles;

    private float kartVelocity;
    private float turnVelocity;

    // Start is called before the first frame update
    void Start()
    {
        kartVelocity = 0.0f;
        for (int i = 0; i < leftParticles.Length; i++)
        {
            var main = leftParticles[i].main;
            main.startSpeed = 0;
            var emission = leftParticles[i].emission;
            emission.rateOverTime = 0;
        }
        for (int i = 0; i < rightParticles.Length; i++)
        {
            var main = rightParticles[i].main;
            main.startSpeed = 0;
            var emission = rightParticles[i].emission;
            emission.rateOverTime = 0;
        }
    }

    // Update is called once per frame
    void Update()
    {
        //Debug.Log(kartVelocity);
        // If the kart is fast enough
        if ( Mathf.Abs(kartVelocity) > 5  )
        {
            // Turn it on
            if ( !backParticles[0].isPlaying )
            {
                for (int i = 0; i < backParticles.Length; i++)
                {
                    backParticles[i].Play();
                }
            }

            // Adjust the speed
            for (int i = 0; i < backParticles.Length; i++)
            {
                var main = backParticles[i].main;
                main.startSpeed = MapValue(kartVelocity, 0, 25, 0, 10);
            }

            for (int i = 0; i < leftParticles.Length; i++)
            {
                var main = leftParticles[i].main;
                main.startSpeed = MapValue(turnVelocity, -1, 0, 2, 0);
                var emission = leftParticles[i].emission;
                emission.rateOverTime = MapValue(turnVelocity, -1, 0, 20, 0);
            }
            for (int i = 0; i < rightParticles.Length; i++)
            {
                var main = rightParticles[i].main;
                main.startSpeed = MapValue(turnVelocity, 0, 1, 0, 2);
                var emission = rightParticles[i].emission;
                emission.rateOverTime = MapValue(turnVelocity, 0, 1, 0, 20);
            }
        }
        else
        {
            if ( backParticles[0].isPlaying )
            {
                for (int i = 0; i < backParticles.Length; i++)
                {
                    backParticles[i].Stop();
                }
            }
        }
    }

    public void SetVelocity(float velocity)
    {
        kartVelocity = velocity;
    }

    public void SetTurn(float turn)
    {
        turnVelocity = turn;
    }
    // http://james-ramsden.com/map-a-value-from-one-number-scale-to-another-formula-and-c-code/
    private float MapValue(float a, float a0, float a1, float b0, float b1)
    {
        return b0 + (b1 - b0) * ((a - a0) / (a1 - a0));
    }
}
