<div class="container">
  <div>
    <h1>{name}</h1>
    <h3>{title}</h3>
  </div>

    <hr>
  <div class="aboutMe">
  <CloudinaryContext cloudName="didtkbpn7">
    <Image publicId={imageUrl}>
      <Transformation
        crop="scale"
        width="300"
        height="200"
        dpr="auto"
        responsive_placeholder="blank" />
  </Image>
  </CloudinaryContext>
  </div>

  <div class="homeInfo">
    <h1>Hello,</h1>
    <h2>a bit more about me: </h2>
    <h3>{aboutme}</h3>
    <div>
    {profile.skills &&
      <div>
        <p> Professional Skills:</p>
        {profile.skills.map((skill) =>
          <p>{skill}</p>
        )}
      </div>
    }

    <div class="resume">
      <p><a href={resume}>MY RESUME</a></p>
    </div>

    <div class="resume">
      <p><a href={linkedIn}>LinkedIn</a></p>
    </div>

    <div class="resume">
      <p><a href={portfolio}>Portfolio</a></p>
    </div>

    <p>{aboutme}</p>
  </div>
</div>
<hr>
  <div>
    <p class="contact"><i class="far fa-phone"></i>{phone}</p>
    <p class="contact"><i class="far fa-envelope"></i>email: {}</p>
    <p class="contact"><a href={github} target="_blank"><i class="fab fa-github"></i> Github</a></p>
    <p class="contact"><a href={linkedIn}  target="_blank" > <i class="fab fa-linkedin-in"></i> Linked In</a></p>
  </div>
  </div>
