<script lang="ts">
  export let badgeType:
    | 'utility'
    | 'business'
    | 'math'
    | 'health'
    | 'education'
    | 'finance'
    | 'productivity'
    | 'fun'
</script>

<div class="badge badge-soft badge-secondary badge-sm">
  {#if badgeType === 'utility'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"
      /></svg
    >
  {:else if badgeType === 'business'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M200-200v-560h120v560h-120Zm160 0v-560h120v560h-120Zm160 0v-560h120v560h-120Zm160 0v-560h120v560h-120Z"
      /></svg
    >
  {:else if badgeType === 'math'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
      /></svg
    >
  {:else if badgeType === 'health'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
      /></svg
    >
  {:else if badgeType === 'education'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M300-80q-58 0-99-41t-41-99v-520q0-58 41-99t99-41h500v600q-25 0-42.5 17.5T740-220q0 25 17.5 42.5T800-160v80H300Zm-60-267q14-7 29-10t31-3h20v-440h-20q-25 0-42.5 17.5T240-740v393Zm160-13h320v-440H400v440Zm-160 13v-453 453Zm60 187h373q-6-14-9.5-28.5T660-220q0-16 3-31t10-29H300q-26 0-43 17.5T240-220q0 26 17 43t43 17Z"
      /></svg
    >
  {:else if badgeType === 'finance'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"
      /></svg
    >
  {:else if badgeType === 'productivity'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M360-120q-100 0-170-70t-70-170v-240q0-100 70-170t170-70h240q100 0 170 70t70 170v240q0 100-70 170t-170 70H360Zm80-200 240-240-56-56-184 184-88-88-56 56 144 144Zm-80 120h240q66 0 113-47t47-113v-240q0-66-47-113t-113-47H360q-66 0-113 47t-47 113v240q0 66 47 113t113 47Zm120-280Z"
      /></svg
    >
  {:else if badgeType === 'fun'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1rem"
      viewBox="0 -960 960 960"
      width="1rem"
      fill="#FFFFFF"
      ><path
        d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z"
      /></svg
    >
  {/if}
  {badgeType}
</div>
