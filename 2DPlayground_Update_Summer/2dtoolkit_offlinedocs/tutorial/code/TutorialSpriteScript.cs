using UnityEngine;
using System.Collections;

public class TutorialSpriteScript : MonoBehaviour {

tk2dSprite sprite;

// Use this for initialization
void Start () {
	sprite = GetComponent<tk2dSprite>();
}

// Update is called once per frame
void Update () {
		if (Input.GetKeyDown(KeyCode.A))
		{
			sprite.color = Color.red;
		}
		if (Input.GetKeyDown(KeyCode.S))
		{
			sprite.color = Color.white;
		}
	}
}
