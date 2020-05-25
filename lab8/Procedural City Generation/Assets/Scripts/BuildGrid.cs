using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BuildGrid : MonoBehaviour
{
    public GameObject[] buildings;
    public GameObject xstreets;
    public GameObject zstreets;
    public GameObject crossroad;
    public int mapWidth = 20;
    public int mapHeight = 20;
    int[,] mapgrid;
    public int buildingFootprint = 3;

    // Start is called before the first frame update
    void Start()
    {
        mapgrid = new int[mapWidth, mapHeight];

        // generate map data
        float seed = Random.Range(0, 100);
        for (int h = 0; h < mapHeight; h++)
        {
            for(int w = 0; w < mapWidth; w++)
            {
                mapgrid[w,h] = (int)(Mathf.PerlinNoise(w / 5.0f + seed, h / 5.0f + seed) * 10);
            }
        }

        // Build streets
        int x = 0;
        for (int n = 0; n < 50; n++)
        {
            for (int h = 0; h < mapHeight; h++)
            {
                mapgrid[x, h] = -1;
            }
            x += Random.Range(3, 3);
            if (x >= mapWidth) break;
        }

        int z = 0;
        for(int n = 0; n < 10; n++)
        {
            for(int w= 0; w < mapWidth; w++)
            {
                if (mapgrid[w, z] == -1)
                    mapgrid[w, z] = -3;
                else
                    mapgrid[w, z] = -2;
            }
            z += Random.Range(2, 20);
            if (z >= mapHeight) break;
        }

        // Generate City
        for (int h = 0; h < mapHeight; h++)
        {
            for(int w = 0; w < mapWidth; w++)
            {
                int result = mapgrid[w,h];
                Vector3 pos = new Vector3(w * buildingFootprint, 0, h * buildingFootprint);
                if(result < -2)
                    Instantiate(crossroad, pos, crossroad.transform.rotation);
                else if(result < -1)
                    Instantiate(xstreets, pos, xstreets.transform.rotation);
                else if(result < 0)
                    Instantiate(zstreets, pos, crossroad.transform.rotation);
                else if(result < 3)
                    Instantiate(buildings[0], pos, Quaternion.identity);
                else if (result < 5)
                    Instantiate(buildings[1], pos, Quaternion.identity);
                else if (result < 6)
                    Instantiate(buildings[2], pos, Quaternion.identity);
                else if (result < 7)
                    Instantiate(buildings[3], pos, Quaternion.identity);
                else if (result < 8)
                    Instantiate(buildings[4], pos, Quaternion.identity);
                else if (result < 10)
                    Instantiate(buildings[5], pos, Quaternion.identity);
            }
        }
    }
}
