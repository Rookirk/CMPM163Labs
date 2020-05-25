using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Building : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        transform.Rotate(0.0f, 90.0f * Random.Range(0,3), 0.0f);
    }
}
