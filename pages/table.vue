<template>
  <div class="table-container">
    <table>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td colspan="2">4</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td rowspan="2">3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td rowspan="2">1</td>
        <td>2</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>2</td>
        <td>3</td>
        <td rowspan="3">4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td rowspan="2">5</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
    </table>
  </div>
</template> 