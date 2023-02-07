const api = "http://localhost:5000/";

export async function postRequestPin(mobile) {
  let buildUrl = `${api}CreateNewAccessCode`;
  return await postMethod(buildUrl, { mobile });
}
export async function postValidatePin(otp, mobile) {
  let buildUrl = `${api}ValidateAccessCode`;
  return await postMethod(buildUrl, { mobile, otp });
}
export async function postLikeGithubUser(phone_number, github_user_id) {
  let buildUrl = `${api}likeGithubUser`;
  return await postMethod(buildUrl, { phone_number, github_user_id });
}

export async function getGithubUsers(page, per_page, q, phone_number) {
  let buildUrl = `${api}searchGithubUsers?page=${!!page?page:''}&per_page=${!!per_page?per_page:''}&q=${!!q?q:''}&phone_number=${!!phone_number?phone_number:''}`;
  return await getMethod(buildUrl);
}

export async function getGithubUser(username) {
  let buildUrl = `${api}findhGithubUserProfile?username=${username}`;
  return await getMethod(buildUrl);
}

export async function getProfile(mob) {
  let buildUrl = `${api}getUserProfile?phone_number=${mob}`;
  return await getMethod(buildUrl);
}

async function postMethod(endpoint, data) {
  console.log("POST:: ",endpoint);
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function getMethod(endpoint) {
  console.log("POST:: ",endpoint);
  return fetch(endpoint).then((resp) => resp.json());
}
