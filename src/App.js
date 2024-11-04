import { Console, MissionUtils } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    let price = await Console.readLineAsync("구입금액을 입력해 주세요.\n");

    if (price < 1000) {
        Console.print("[ERROR] 1000원 이상의 금액을 입력해 주세요.");
        return;
    }

    if (price % 1000 !== 0) {
        Console.print("[ERROR] 구입금액이 1000원으로 나누어떨어지지 않습니다.");
        return;
    }

    let count = Math.floor(price / 1000);
    Console.print(`${count}개를 구매했습니다.`);
    let lottoCount = this.getLottoNumbers(count);
    Console.print(lottoCount.map((nums) => `[${nums.join(", ")}]`).join("\n"));

    let winningNumbersInput = await Console.readLineAsync(
      "당첨 번호를 입력해 주세요.\n"
    );

    let winningNumbers = winningNumbersInput
      .split(",")
      .map((num) => parseInt(num.trim()));

    try {
      new Lotto(winningNumbers);
    } catch (error) {
      Console.print(error.message);
      return;
    }

    let bonusNumberInput = await Console.readLineAsync(
      "보너스 번호를 입력해 주세요.\n"
    );

    let result = this.getResult(comparedList);
    let rate = this.getRate(result[1], price);
    Console.print("당첨 통계\n---");
    Console.print(result[0]);
    Console.print(`총 수익률은 ${rate}%입니다.`);
  }

  getLottoNumbers(num) {
    let lottoNumbers = [];
    for (let i = 0; i < num; i++) {
      let numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      lottoNumbers.push(numbers);
    }
    return lottoNumbers;
  }

  getRate(result, price) {
    const prizeMoney = {
      3: 5000,
      4: 50000,
      5: 1500000,
      "5(bonus)": 30000000,
      6: 2000000000,
    };

    let totalPrize =
      result[3] * prizeMoney[3] +
      result[4] * prizeMoney[4] +
      result[5] * prizeMoney[5] +
      result["5(bonus)"] * prizeMoney["5(bonus)"] +
      result[6] * prizeMoney[6];

    let rate = ((totalPrize / price) * 100).toFixed(1);
    return rate;
  }
}

export default App;
